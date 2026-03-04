---
title: "C++ in Godot: Creating a Top-Down shooter called Tower - Chapter 1"
description: 'In this chapter of the series, we will set up the base project for using C++ in Godot. We will configure the project to run effectively with Visual Studio Code as a free IDE proposal but, the concepts that will be covered are applicable to any IDE of your choice.'
category: 'Games'
pubDate: 2026-03-01
heroImage: '@/assets/Media/Games/godot-series/godot_epic.png'
tags:
  - games
  - godot
  - cpp
  - performance
  - architecture
---

So, it is time to get our hands dirty and start working on the base project for using C++ in Godot for Game Development. In this chapter, we will set up the project structure, configure the build system, and ensure that everything is ready for development. We will be using Visual Studio Code as our IDE, but the concepts we cover will be applicable to any IDE you choose.

We are going to be building on top of the `Godot Engine version 4.6`. By the time you read this, there might be newer versions available, so make sure to check the official Godot website for the latest version. The steps we will cover should be applicable to newer versions as well, but always refer to the official documentation for any specific changes or updates. Said that, I recommend you to use the same version to avoid any compatibility issues while following along with the series and, after that, undertake the necessary steps to upgrade if needed.

> This series assumes a minimum level of understanding of `C++` and `Godot`. It is not intended to cover all aspects of the development but the basics based on the goals that we have set.

Get ready! We are going to build our top-down shooter game, Tower Rescue, and this is just the beginning. Let's dive in and set up our base project for C++ development in Godot!

## Step 1: Setting Up the Godot Project

This is the first step. Wasn't obvious? We need to create a new Godot project that will serve as the base for our C++ development. 

Since, I don't want these series to be a boring tutorial only, we are going to create a game to follow along!

Open Godot and create a new project. You can name it something like "TowerRescue". Choose a location on your computer where you want to save the project and click "Create & Edit". Also make sure that you select the "Forward+" rendering option; why? Because, why not (being honest, we could go for Compatibility).

![Creating a new Godot project](@/assets/Media/Games/godot-series/godot-new-project.png)

Don't forget to also select the `Git` version control metadata option.

Once the project has initialized, we are going to change a couple of setting in the `Project Settings`. See the values and the rationale below:

| Setting | Value | Rationale |
|---------|-------|-----------|
| display/window/vsync/vsync_mode | Enabled | We want to sync the maximum refresh rate of our game to the display max. frequency |
| application/run/max_fps | 90 | In case the user has disabled V-Sync via hardware configuration, we want to top the performance to a maximum value to avoid using too many resources from the GPU |
| application/config/version | 0.1.0 | Just the version of hour first version |
 

## Step 2: Getting the Assets

Now that we have our project set up, we need to get some assets to work with. For this series, we will be using free assets from the [Kenney Asset Pack](https://kenney.nl/assets). You can download the ["Top Down Shooter" asset pack](https://kenney.nl/assets/top-down-shooter), which contains all the necessary sprites and tilesets for our game.

