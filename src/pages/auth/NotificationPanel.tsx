// import { X, Bell } from "lucide-react";

// const NotificationPanel = ({ open, onClose }) => {
//  if (!open) return null;

//  return (
//   <>
//    {/* Overlay */}
//    <div
//     onClick={onClose}
//     className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
//    />

//    {/* Panel */}
//    <div className="fixed top-0 right-0 h-full w-[360px] bg-white dark:bg-neutral-900 z-50 shadow-xl flex flex-col">
//     {/* Header */}
//     <div className="flex items-center justify-between px-4 py-4 border-b">
//      <div className="flex items-center gap-2">
//       <Bell className="h-5 w-5 text-orange-600" />
//       <h3 className="font-medium text-lg">Notifications</h3>
//      </div>
//      <button onClick={onClose}>
//       <X className="h-5 w-5 text-gray-500 hover:text-black" />
//      </button>
//     </div>

//     {/* Content */}
//     <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
//      <p className="text-gray-500 text-sm mb-2">No notifications</p>
//      <p className="text-xs text-gray-400">
//       You’re all caught up ✨
//      </p>
//     </div>

//     {/* Footer */}
//     <div className="p-4 border-t">
//      <button
//       onClick={onClose}
//       className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
//      >
//       Close
//      </button>
//     </div>
//    </div>
//   </>
//  );
// };

// export default NotificationPanel;
import { X, Bell } from "lucide-react";

const NotificationPanel = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed top-20 right-6 z-50">
            {/* Panel */}
            <div className="w-[320px] rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden border border-gray-200 dark:border-neutral-800">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b bg-[#fff7ed] dark:bg-neutral-800">
                    <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-orange-600" />
                        <h3 className="font-medium text-sm text-gray-800 dark:text-gray-100">
                            Notifications
                        </h3>
                    </div>

                    {/* Close (ONLY ONE CLOSE OPTION) */}
                    <button onClick={onClose}>
                        <X className="h-4 w-4 text-gray-500 hover:text-black dark:hover:text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center justify-center text-center px-6 py-10">
                    <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                        <Bell className="h-6 w-6 text-orange-600" />
                    </div>

                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        No notifications
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        You’re all caught up ✨
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotificationPanel;


