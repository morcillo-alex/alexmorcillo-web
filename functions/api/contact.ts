interface Env {
	TURNSTILE_SECRET_KEY: string;
	RESEND_API_KEY: string;
}

interface ContactBody {
	name: string;
	email: string;
	message: string;
	turnstileToken: string;
}

interface TurnstileVerifyResponse {
	success: boolean;
	'error-codes': string[];
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function jsonResponse(body: object, status: number): Response {
	return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
	let body: ContactBody;
	try {
		body = (await context.request.json()) as ContactBody;
	} catch {
		return jsonResponse({ error: 'Invalid request body.' }, 400);
	}

	const { name, email, message, turnstileToken } = body;

	if (!name?.trim() || !email?.trim() || !message?.trim()) {
		return jsonResponse({ error: 'All fields are required.' }, 400);
	}

	// Verify Cloudflare Turnstile token server-side
	const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: JSON_HEADERS,
		body: JSON.stringify({
			secret: context.env.TURNSTILE_SECRET_KEY,
			response: turnstileToken,
		}),
	});

	const turnstileData = (await turnstileRes.json()) as TurnstileVerifyResponse;
	if (!turnstileData.success) {
		return jsonResponse({ error: 'Human verification failed. Please try again.' }, 400);
	}

	// Send email via Resend
	const emailRes = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
		},
		body: JSON.stringify({
			from: 'alexmorcillo.com <contact@alexmorcillo.com>',
			to: 'contact.me@alexmorcillo.com',
			reply_to: email,
			subject: `New message from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
		}),
	});

	if (!emailRes.ok) {
		return jsonResponse({ error: 'Failed to send your message. Please try again later.' }, 500);
	}

	return jsonResponse({ success: true }, 200);
}
