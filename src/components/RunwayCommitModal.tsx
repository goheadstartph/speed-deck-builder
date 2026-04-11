import { useState } from "react";
import { format, addDays } from "date-fns";
import { CalendarIcon, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface RunwayCommitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  onConfirm: (targetDate: Date, remindersEnabled: boolean) => void;
}

const quickOptions = [
  { label: "In 3 days", days: 3 },
  { label: "Next week", days: 7 },
  { label: "In 2 weeks", days: 14 },
];

const RunwayCommitModal = ({
  open,
  onOpenChange,
  productName,
  onConfirm,
}: RunwayCommitModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [activeQuick, setActiveQuick] = useState<number | null>(7);

  const handleQuickSelect = (days: number) => {
    setSelectedDate(addDays(new Date(), days));
    setActiveQuick(days);
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setActiveQuick(null);
  };

  const handleConfirm = () => {
    if (!selectedDate) return;
    onConfirm(selectedDate, remindersEnabled);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border/50 sm:max-w-md p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Rocket className="h-5 w-5 text-primary" />
            <DialogTitle className="text-lg font-semibold text-foreground">
              Commit to your Runway
            </DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You're adding <span className="font-medium text-foreground">{productName}</span> to your Runway. When do you want to have this set up by?
          </p>
        </DialogHeader>

        <div className="border-t border-border/50" />

        {/* Quick select pills */}
        <div className="px-6 pt-5 pb-2">
          <p className="text-xs font-medium text-muted-foreground mb-3">Quick select</p>
          <div className="flex gap-2">
            {quickOptions.map((opt) => (
              <button
                key={opt.days}
                onClick={() => handleQuickSelect(opt.days)}
                className={cn(
                  "rounded-lg px-4 py-2 text-xs font-medium border transition-all",
                  activeQuick === opt.days
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border/40 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom date picker */}
        <div className="px-6 py-3">
          <p className="text-xs font-medium text-muted-foreground mb-3">Or pick a date</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-10 rounded-lg border-border/40 bg-white/5",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleCalendarSelect}
                disabled={(date) => date < new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="border-t border-border/50 mx-6" />

        {/* Reminder toggle */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Remind me before my deadline</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Get a nudge before your target date</p>
          </div>
          <Switch
            checked={remindersEnabled}
            onCheckedChange={setRemindersEnabled}
          />
        </div>

        <div className="border-t border-border/50" />

        {/* CTA */}
        <div className="px-6 py-5">
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate}
            className="w-full h-11 rounded-lg text-sm font-semibold"
          >
            <Rocket className="mr-2 h-4 w-4" />
            Add to Runway
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RunwayCommitModal;
