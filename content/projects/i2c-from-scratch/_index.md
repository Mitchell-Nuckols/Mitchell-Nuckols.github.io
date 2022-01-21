---
title: I2C From Scratch
status: idea
type: project-entry

date: 2021-11-28
updated: 2021-11-28

---

## Outline:
Yesterday, out of nowhere and with a sudden burst of motivation, I decided I want to implement the i2c (two-wire serial) protocol from scratch. I figure this endeavour could be a nice exploration into both how the protocol works and how it is implemented on the controller and peripheral sides.

## The Plan:

### Controller:
I'll be using an Arduino Uno board to prototype and develop the controller-side firmware. At the heart of the Uno is an 8-bit Atmel ATMega328p microcontroller. 

The Arduino environment comes with a very helpful and expansive SDK that greatly simplifies working with the core microcontroller. This includes the Wire library, which adds support for the ATMega328p's Two-Wire-Interface (TWI) hardware. For this project, I will be throwing out the entirety of this SDK - we're going back to basics for this one! I plan to initally write the firmware in Zig, as the new systems language has captured my interests in recent months and I think it's time I finally use it in a project. There are some very helpful resources online showing how to load a Zig program onto an Atmel chip without any assistance from libraries written in C/C++. Once you get past the linker stuff and register definitions, this process is surprisingly easy, mostly thanks to Zig's incredible interoperability with C.

The plan for this side of the project is to interface directly with the microcontroller's TWI registers to send/receive data over two-wire serial.

### Peripheral:
This section is a part of my never-ending need to apply scope-creep to every idea I have. I'm going to tread this area lightly, as that sort of thinking can be the ultimate project-killer. Daydreaming about how crazy I can make a project very quickly leads to no project being made at all.

I have this BASYS-3 board from one of my first-year ECE labs that a TA told me I could keep keep, and I think it is time it gets put to some use. I want to write some gateware that reads/writes over two-wire serial as a peripheral. I'm thinking I'll just use the on-board LEDs to display data sent to the device and the switches to provide data to send to the controller. Nothing complicated, just something to get me used to how the other side of i2c works, particularly at a gate level. Okay, it is probably complicated relative to my skill level, but that's the fun part!
