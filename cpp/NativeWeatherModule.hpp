#pragma once

#include <AppSpecJSI.h>

#include <memory>
#include <string>

namespace facebook::react {

class NativeWeatherModule final : public NativeWeatherModuleCxxSpec<NativeWeatherModule> {
public:
  NativeWeatherModule(std::shared_ptr<CallInvoker> jsInvoker);

  jsi::Object getDeviceInfo(jsi::Runtime& rt);
};

} // namespace facebook::react

