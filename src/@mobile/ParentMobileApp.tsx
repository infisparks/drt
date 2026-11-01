import React, { useState } from 'react';
import { TopStatusBar } from './components/TopStatusBar';
import { MobileHeader } from './components/MobileHeader';
import { BottomNavBar, MobileTabKey } from './components/BottomNavBar';

// Screens (8 Screens from reference image)
import { HomeScreen } from './screens/HomeScreen';
import { AcademicsScreen } from './screens/AcademicsScreen';
import { MarksScreen } from './screens/MarksScreen';
import { FeesScreen } from './screens/FeesScreen';
import { AttendanceScreen } from './screens/AttendanceScreen';
import { TransportScreen } from './screens/TransportScreen';
import { NoticesScreen } from './screens/NoticesScreen';
import { ProfileScreen } from './screens/ProfileScreen';

// Modals
import { StudentSwitcherModal } from './components/StudentSwitcherModal';
import { LeaveApplicationModal } from './components/LeaveApplicationModal';
import { PayFeeModal } from './components/PayFeeModal';
import { TimetableModal } from './components/TimetableModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { MoreMenuDrawer } from './components/MoreMenuDrawer';

// Data
import { 
  PARENT_DATA, 
  STUDENTS_LIST, 
  StudentProfileData, 
  FEE_STRUCTURE_DATA 
} from './data/parentAppData';

export type ScreenId = 
  | 'home'
  | 'academics'
  | 'marks'
  | 'fees'
  | 'attendance'
  | 'transport'
  | 'notices'
  | 'profile';

interface ParentMobileAppProps {
  forcedScreen?: ScreenId;
  onScreenChange?: (screen: ScreenId) => void;
  hideFrameChrome?: boolean;
}

export const ParentMobileApp: React.FC<ParentMobileAppProps> = ({
  forcedScreen,
  onScreenChange,
  hideFrameChrome = false
}) => {
  // Navigation State
  const [internalScreen, setInternalScreen] = useState<ScreenId>('home');
  const activeScreen = forcedScreen !== undefined ? forcedScreen : internalScreen;

  const navigateTo = (screen: ScreenId) => {
    setInternalScreen(screen);
    if (onScreenChange) {
      onScreenChange(screen);
    }
  };

  // Student State
  const [currentStudent, setCurrentStudent] = useState<StudentProfileData>(STUDENTS_LIST[0]);
  const siblingStudent = STUDENTS_LIST.find(s => s.id !== currentStudent.id) || STUDENTS_LIST[1];

  // Academics tab subsection
  const [academicsSubSection, setAcademicsSubSection] = useState<'Class Diary' | 'Homework' | 'Syllabus'>('Class Diary');

  // Modals state
  const [isStudentSwitcherOpen, setIsStudentSwitcherOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isPayFeeModalOpen, setIsPayFeeModalOpen] = useState(false);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Map active screen to bottom bar tab
  const getActiveTab = (): MobileTabKey => {
    if (activeScreen === 'home') return 'home';
    if (activeScreen === 'academics' || activeScreen === 'marks') return 'academics';
    if (activeScreen === 'fees') return 'fees';
    if (activeScreen === 'attendance') return 'attendance';
    return 'more';
  };

  const handleTabChange = (tab: MobileTabKey) => {
    if (tab === 'home') navigateTo('home');
    else if (tab === 'academics') navigateTo('academics');
    else if (tab === 'fees') navigateTo('fees');
    else if (tab === 'attendance') navigateTo('attendance');
    else if (tab === 'more') {
      // If already on a more screen, toggle drawer, else go to transport
      if (activeScreen === 'transport' || activeScreen === 'notices' || activeScreen === 'profile') {
        setIsMoreMenuOpen(true);
      } else {
        navigateTo('transport');
      }
    }
  };

  // Screen Title helper
  const getScreenTitle = (): string => {
    switch (activeScreen) {
      case 'home':
        return 'DRT KNOWLEDGE HUB INTERNATIONAL SCHOOL';
      case 'academics':
        return 'Academics';
      case 'marks':
        return 'Marks';
      case 'fees':
        return 'Fee Structure';
      case 'attendance':
        return 'Attendance';
      case 'transport':
        return 'School Transport';
      case 'notices':
        return 'Notices & Events';
      case 'profile':
        return 'Student Profile';
      default:
        return 'Parent App';
    }
  };

  return (
    <div className="w-full min-h-screen max-w-md mx-auto bg-white flex flex-col relative select-none">
      {/* 1. Mobile Top Status Bar */}
      <TopStatusBar darkText={true} />

      {/* 2. Mobile App Header */}
      <MobileHeader
        isHome={activeScreen === 'home'}
        title={getScreenTitle()}
        onBack={() => navigateTo('home')}
        onOpenMenu={() => setIsMoreMenuOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={2}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="absolute top-16 left-4 right-4 z-40 bg-gray-900/95 text-white text-[12px] font-bold py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 3. Screen Content Router */}
      <div className="flex-1 overflow-hidden flex flex-col relative bg-[#F8FAFC]">
        {activeScreen === 'home' && (
          <HomeScreen
            parent={PARENT_DATA}
            currentStudent={currentStudent}
            siblingStudent={siblingStudent}
            onSwitchStudent={() => setIsStudentSwitcherOpen(true)}
            onNavigateTab={(tab, sub) => {
              if (tab === 'academics') {
                if (sub) setAcademicsSubSection(sub as any);
                navigateTo('academics');
              } else if (tab === 'fees') {
                navigateTo('fees');
              } else if (tab === 'attendance') {
                navigateTo('attendance');
              } else if (tab === 'more') {
                navigateTo('transport');
              }
            }}
            onOpenMarks={() => navigateTo('marks')}
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            onOpenTimetableModal={() => setIsTimetableModalOpen(true)}
          />
        )}

        {activeScreen === 'academics' && (
          <AcademicsScreen initialTab={academicsSubSection} />
        )}

        {activeScreen === 'marks' && (
          <MarksScreen
            onDownloadReport={() => {
              showToast('Official CBSE Marksheet downloaded (PDF).');
            }}
          />
        )}

        {activeScreen === 'fees' && (
          <FeesScreen
            onPayNow={() => setIsPayFeeModalOpen(true)}
            onDownloadReceipt={(rec) => {
              showToast(`Receipt ${rec} downloaded successfully.`);
            }}
          />
        )}

        {activeScreen === 'attendance' && (
          <AttendanceScreen
            onApplyLeave={() => setIsLeaveModalOpen(true)}
          />
        )}

        {activeScreen === 'transport' && (
          <TransportScreen
            onCallDriver={() => {
              showToast(`Dialing Driver: ${currentStudent.busDriverName} (${currentStudent.busDriverPhone})`);
            }}
          />
        )}

        {activeScreen === 'notices' && (
          <NoticesScreen
            onSelectNotice={(notice) => {
              showToast(`Opening notice: ${notice.title}`);
            }}
          />
        )}

        {activeScreen === 'profile' && (
          <ProfileScreen
            student={currentStudent}
            parent={PARENT_DATA}
          />
        )}
      </div>

      {/* 4. Bottom Tab Navigation Bar */}
      <BottomNavBar
        activeTab={getActiveTab()}
        onTabChange={handleTabChange}
      />

      {/* Modals & Drawers */}
      <StudentSwitcherModal
        isOpen={isStudentSwitcherOpen}
        onClose={() => setIsStudentSwitcherOpen(false)}
        currentStudentId={currentStudent.id}
        onSelectStudent={(std) => {
          setCurrentStudent(std);
          showToast(`Switched profile to ${std.name} (${std.grade} - ${std.section})`);
        }}
      />

      <LeaveApplicationModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        studentName={currentStudent.name}
        onSubmit={(reason, startDate, days) => {
          showToast(`Leave application submitted for ${days} day(s) starting ${startDate}.`);
        }}
      />

      <PayFeeModal
        isOpen={isPayFeeModalOpen}
        onClose={() => setIsPayFeeModalOpen(false)}
        amount={FEE_STRUCTURE_DATA.termFeeDue}
        dueDate={FEE_STRUCTURE_DATA.dueDate}
        studentName={currentStudent.name}
        onPaymentSuccess={(recId) => {
          showToast(`Fee Payment of ₹18,500 Successful! Receipt #${recId}`);
        }}
      />

      <TimetableModal
        isOpen={isTimetableModalOpen}
        onClose={() => setIsTimetableModalOpen(false)}
        grade={`${currentStudent.grade} - ${currentStudent.section}`}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateTab={(tab, targetScreen) => {
          if (targetScreen === 'transport') navigateTo('transport');
          else if (targetScreen === 'notices') navigateTo('notices');
          else if (tab === 'fees') navigateTo('fees');
        }}
      />

      <MoreMenuDrawer
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
        onSelectScreen={(screen) => navigateTo(screen)}
      />
    </div>
  );
};
export default ParentMobileApp;
