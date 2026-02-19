import "./App.css";
import FixVariableThatDoesntUpdate from "./Components/FixVariableThatDoes'ntUpdate";
import FixFreezingCounter from "./Components/FixFreezingCounter";
import FixNonAdjustableDelay from "./Components/FixNonAdjustableDelay";
import FixDelayNotification from "./Components/FixDelayNotification";
function App() {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-10 md:mb-12 mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
        Separating Events From Effects
      </h1>{" "}
      <FixVariableThatDoesntUpdate />
      <FixFreezingCounter />
      <FixNonAdjustableDelay />
      <FixDelayNotification />
    </>
  );
}

export default App;
