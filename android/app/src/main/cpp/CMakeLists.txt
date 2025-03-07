cmake_minimum_required(VERSION 3.13)
project(appmodules)

include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

set(SHARED_CPP_DIRS "../../../../../cpp")

target_sources(${CMAKE_PROJECT_NAME} PRIVATE "${SHARED_CPP_DIRS}/NativeWeatherModule.cpp")

target_include_directories(${CMAKE_PROJECT_NAME} PUBLIC ${SHARED_CPP_DIRS})