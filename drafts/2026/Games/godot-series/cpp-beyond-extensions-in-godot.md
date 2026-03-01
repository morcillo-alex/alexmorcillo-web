# CPP beyond Extensions in Godot


When thinking in C++ for Godot, the first thing that comes to mind is usually writing extensions. However, C++ can be used as well for building your game logic with relatively little boilerplate, and with great integration with your IDE enabling features like code completion, refactoring, and debugging. 

## Why use C++ for game logic?

Compiling your game logic to native can lead to important performance benefits, especially for CPU-intensive tasks. Additionally, using native, gives you access to the complete API from the engine. Additionally, since Godot included the possibility of using Godot as a Library [add release, release notes for this feature and  link here here] this opens up a whole new world of possibilities beyond building games, specially now, that Godot improved so significantly its support for screen readers [add release, release notes for this feature and  link here here].

On top of that, using C++ enables you to get access to increadibly powerful libraries and tools that before were not available to you, like for example, FLECS or EnTT for ECS, or ImGui for UI.

## Why not use C++ for game logic?

The main reason to not use C++ for game logic is the increased complexity and development time. C++ is a more complex language than GDScript, and it can take longer to write and debug code in C++. Additionally, using C++ requires you to set up a build system and manage dependencies, which can be a barrier for some developers.

## The sweet spot. Combining GDScript and C++

The best of both worlds is to use C++ for performance-critical parts of your game logic, and GDScript for the rest. This way, you can take advantage of the performance benefits of C++ while still enjoying the ease of use and rapid development of GDScript. For example, you could use C++ for your game's core loop or logic, while using GDScript for visualization and gameplay elements. This way, you can get the best of both worlds and create a game that is both performant and easy to develop.

A way to imagine this separation of concerns could be:

 - C++ for the "engine" of your game, the core logic, performance intensive operations and, systems that drive the game. Here we can imagine the tech lead, advanced developers, architects, who are focused on the architecture, and internal mechanics of the game.
 - GDScript for the "frontend" of your game, handling visualization, gameplay elements, and rapid iteration. Here we can imagine the game designers, artists, and developers who are focused on the user experience, and the "fun" part of the game. 

This separation of concerns allows for a more efficient development process, as different team members can focus on their areas of expertise while still contributing to the overall project. It also allows for a more modular and maintainable codebase, as the core logic can be developed and tested independently from the visualization and gameplay elements.

Additionally, keeping the core mechanics and logic of the game in pure C++ can make easier the process of porting the game to other platforms, as the core logic can be reused across different platforms with minimal changes, while the visualization and gameplay elements can be adapted to fit the specific requirements of each platform. At the same time, since we are not completely giving up on GDScript and Godot's editor, we can still take advantage of the powerful tools and features that Godot provides for game development, such as the scene system, animation tools, and visual scripting.

> Using C++ for game logic in Godot can provide significant performance benefits and access to powerful libraries and tools, but it also comes with increased complexity and development time. The best approach is to use C++ for performance-critical parts of your game logic, while using GDScript for the rest, allowing you to take advantage of the strengths of both languages and create a game that is both performant and easy to develop.






