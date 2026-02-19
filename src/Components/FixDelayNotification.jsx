import { useState, useEffect } from "react";
import { useEffectEvent } from "react";

const serverUrl = "https://localhost:1234";

function ChatRoom({ roomId, theme }) {
  const showNotificationWithTheme = useEffectEvent((room) => {
    showNotification("Welcome to " + room, theme);
  });

  useEffect(() => {
    let timeoutId;

    const connection = createConnection(serverUrl, roomId);
    connection.on("connected", () => {
      timeoutId = setTimeout(() => {
        showNotificationWithTheme(roomId);
      }, 2000);
    });
    connection.connect();

    return () => {
      clearTimeout(timeoutId);
      connection.disconnect();
    };
  }, [roomId]);

  return (
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mt-4 sm:mt-6 mb-4 sm:mb-6">
      Welcome to the {roomId} room!
    </h2>
  );
}

export default function FixDelayNotification() {
  const [roomId, setRoomId] = useState("general");
  const [isDark, setIsDark] = useState(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-[calc(100vh-40px)] max-h-fit py-5 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-900 dark:text-white">
          Chat Room with Delayed Notifications
        </h2>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 space-y-6 sm:space-y-8">
          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
            <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Choose the chat room:
              </span>
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full sm:w-48 px-4 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white outline-none transition-all"
              >
                <option value="general">general</option>
                <option value="travel">travel</option>
                <option value="music">music</option>
              </select>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Dark theme
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isDark}
                  onChange={(e) => setIsDark(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Chat Room Component */}
          <ChatRoom roomId={roomId} theme={isDark ? "dark" : "light"} />

          {/* Info Message */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
              ⏰ Notifications will appear after a 2-second delay when you join
              a room. Try switching rooms quickly to see the effect!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error("Cannot add the handler twice.");
      }
      if (event !== "connected") {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    },
  };
}

// Mock notification function (add this if not imported)
function showNotification(message, theme) {
  // Create a temporary notification element
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-slide-in ${
    theme === "dark"
      ? "bg-gray-800 text-white border border-gray-700"
      : "bg-white text-gray-900 border border-gray-200"
  }`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add("animate-slide-out");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add these animations to your global CSS or in a style tag
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .animate-slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  .animate-slide-out {
    animation: slideOut 0.3s ease-in forwards;
  }
`;
document.head.appendChild(style);
