#!/bin/bash

"/Volumes/SSD/usr/local/bin/wasi-sdk-25.0-arm64-macos/bin/clang++" \
    --target=wasm32-wasi \
    -Wl,--allow-undefined \
    -Wl,--export-table \
    -Wl,--export=__heap_base \
    -std=c++20 \
    -O3 \
    main.cpp \
    -o main.wasm
