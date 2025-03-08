#include "NativeWeatherModule.hpp"

#include <string>
#include <random>

#if __APPLE__
# include <sys/sysctl.h>
#elif __ANDROID__
# include <sys/system_properties.h>
#endif

namespace {
  static const std::vector<std::string> ICON_CODES = {"01", "02", "03", "04", "09", "10", "11", "13", "50"};
  static const std::vector<char> ICON_SUFFIX = {'d', 'n'};
  static const std::vector<std::string> WEATHER = {"Clear", "Rain", "Clouds", "Snow"};
  static std::random_device rd;
  static std::mt19937 gen(rd());

  double roundToTwo(double value) {
    return std::round(value * 100.0) / 100.0;
  }

  double getRandomDouble(double min, double max) {
    std::uniform_real_distribution<> dis(min, max);
    return roundToTwo(dis(gen));
  }

  int getRandomInt(int min, int max) {
    std::uniform_int_distribution<> dis(min, max);
    return roundToTwo(dis(gen));
  }

  std::string getRandomWeatherIcon() {
    std::string code = ICON_CODES[getRandomInt(0, ICON_CODES.size() - 1)];
    char suffix = ICON_SUFFIX[getRandomInt(0, ICON_SUFFIX.size() - 1)];
    return code + suffix;
  }

  std::string getRandomWeatherMain() {
    return WEATHER[getRandomInt(0, WEATHER.size() - 1)];
  }

  // NOTE for demo propose only! In real world make sense keep implementation separate
  std::string getDeviceName() {
    char model[256];
#if __APPLE__
    size_t size = sizeof(model);
    if (sysctlbyname("hw.model", model, &size, nullptr, 0) == 0) {
      return std::string(model);
    }
#elif __ANDROID__
    if (__system_property_get("ro.product.model", model) > 0) {
      return std::string(model);
    }
#endif
    return "Unknown";
  }
} // anonymous namespace to keep functions private

namespace facebook::react {

NativeWeatherModule::NativeWeatherModule(std::shared_ptr<CallInvoker> jsInvoker)
  : NativeWeatherModuleCxxSpec(std::move(jsInvoker)) {}

jsi::Object NativeWeatherModule::getDeviceInfo(jsi::Runtime& rt) {
  jsi::Object deviceInfo(rt);

  deviceInfo.setProperty(rt, "name", jsi::String::createFromUtf8(rt, getDeviceName()));
  // TODO while for now data is random we can use native API to make it more or less real
  // temp: we can measure temperature of differenc device parts to get some approx of surrounding temp
  // humidity: no idea yet
  // pressure: altimeter can be used to approximation
  // - https://developer.android.com/ndk/reference/group/sensor#group___sensor_1gga56a0f36da7f9eaaf54bd05cc2bf49173ac37ae6172f2e29b96ec9ce49f102c00d
  // - https://developer.apple.com/documentation/coremotion/cmaltimeter
  // wind_speed: some time ago I saw a project that did some calculation based on Microphone, not sure if they prooven
  // - clouds: no idea yet
  // - weather_icon: no idea yet
  // - weather_main: no idea yet
  deviceInfo.setProperty(rt, "temp", jsi::Value(getRandomDouble(-10.0, 40.0)));
  deviceInfo.setProperty(rt, "humidity", jsi::Value(getRandomDouble(10.0, 100.0)));
  deviceInfo.setProperty(rt, "pressure", jsi::Value(getRandomDouble(900.0, 1100.0)));
  deviceInfo.setProperty(rt, "wind_speed", jsi::Value(getRandomDouble(0.0, 20.0)));
  deviceInfo.setProperty(rt, "clouds", jsi::Value(getRandomInt(0, 100)));
  deviceInfo.setProperty(rt, "weather_icon", jsi::String::createFromUtf8(rt, getRandomWeatherIcon()));
  deviceInfo.setProperty(rt, "weather_main", jsi::String::createFromUtf8(rt, getRandomWeatherMain()));

  return deviceInfo;
}

} // namespace facebook::react
