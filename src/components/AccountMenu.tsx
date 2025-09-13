import { ArrowLeft, User, Ticket, MapPin, Globe, AlertTriangle, Headphones, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountMenu = ({ isOpen, onClose }: AccountMenuProps) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      icon: User,
      title: '9430363521',
      subtitle: 'Account',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-800'
    },
    {
      icon: Ticket,
      title: 'My tickets / passes',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-800'
    },
    {
      icon: MapPin,
      title: 'Bus stops near me',
      bgColor: 'bg-white',
      textColor: 'text-gray-800'
    },
    {
      icon: Globe,
      title: 'Change language',
      bgColor: 'bg-white',
      textColor: 'text-gray-800'
    },
    {
      icon: AlertTriangle,
      title: 'SOS',
      bgColor: 'bg-white',
      textColor: 'text-red-600'
    },
    {
      icon: Headphones,
      title: 'Customer support',
      bgColor: 'bg-white',
      textColor: 'text-gray-800'
    },
    {
      icon: Shield,
      title: 'Manage Consent',
      bgColor: 'bg-white',
      textColor: 'text-gray-800'
    }
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 max-w-sm mx-auto">

      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="mr-3 p-0 hover:bg-transparent"
        >
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">Account</h1>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6 space-y-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${item.bgColor} rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-sm transition-shadow`}
          >
            <div className="flex items-center gap-4">
              <item.icon className={`w-5 h-5 ${item.textColor}`} />
              <div className="flex-1">
                <h3 className={`font-medium ${item.textColor}`}>
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-4 right-4">
        <div className="flex justify-between items-center text-gray-600">
          <span className="text-sm">Terms and conditions</span>
          <span className="text-sm">V 10.8.4</span>
        </div>
      </div>
    </div>
  );

};
