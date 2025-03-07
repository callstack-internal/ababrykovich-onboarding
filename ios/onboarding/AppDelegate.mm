  /*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Source: https://github.com/facebook/react-native/blob/v0.76.7/packages/helloworld/ios/HelloWorld/AppDelegate.mm
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <RCTAppDelegate.h>

#import "NativeWeatherModule.hpp"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"oneboarding";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  if (name == "NativeWeatherModule") {
    return std::make_shared<facebook::react::NativeWeatherModule>(jsInvoker);
  }

  return [super getTurboModule:name jsInvoker:jsInvoker];
}

@end
