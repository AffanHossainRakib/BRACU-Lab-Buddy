import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, MapPin, Calendar } from "lucide-react";

import DefaultLayout from "@/layouts/default";

interface LabSchedule {
  Course: string;
  "Lab Day": string;
  "Lab Time (3hr)": string;
  "Lab Room": string;
}

export default function IndexPage() {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [freeLabs, setFreeLabs] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [uniqueLabs, setUniqueLabs] = useState<Set<string>>(new Set());
  const [labInfo, setLabInfo] = useState<Map<string, Set<string>>>(new Map());

  const days = ["SAT", "SUN", "MON", "TUE", "WED", "THU"];
  const times = ["8:00 AM", "11:00 AM", "2:00 PM"];

  useEffect(() => {
    fetch("/CSE_Lab_Schedule.json")
      .then((response) => response.json())
      .then((data: LabSchedule[]) => {
        const labs = new Set<string>();
        const info = new Map<string, Set<string>>();

        data.forEach((singleLabInfo) => {
          labs.add(singleLabInfo["Lab Room"]);
          const key = `${singleLabInfo["Lab Day"]}-${singleLabInfo["Lab Time (3hr)"]}`;

          if (!info.has(key)) {
            info.set(key, new Set());
          }
          info.get(key)!.add(singleLabInfo["Lab Room"]);
        });

        setUniqueLabs(labs);
        setLabInfo(info);
      })
      .catch((error) => {
        console.warn("Could not load lab schedule:", error);
      });
  }, []);

  const findFreeLabs = (day: string, time: string) => {
    const dayTime = `${day}-${time}`;
    const busyLabs = labInfo.get(dayTime) || new Set();
    const availableLabs = [...uniqueLabs].filter((lab) => !busyLabs.has(lab));

    setFreeLabs(availableLabs);
    setShowResults(true);
  };

  const findFreeLabsNow = () => {
    const now = new Date();
    const dayMap = {
      0: "SUN",
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THU",
      5: "FRI",
      6: "SAT",
    };
    const currentDay = dayMap[now.getDay() as keyof typeof dayMap];

    const hour = now.getHours() + now.getMinutes() / 60;
    let currentTime = "";

    if (hour >= 8 && hour < 11) {
      currentTime = "8:00 AM";
    } else if (hour >= 11 && hour < 14) {
      currentTime = "11:00 AM";
    } else if (hour >= 14 && hour < 17) {
      currentTime = "2:00 PM";
    }

    if (currentDay === "FRI") {
      setFreeLabs(["Labs are closed on Friday"]);
      setShowResults(true);

      return;
    }

    if (currentTime) {
      setSelectedDay(currentDay);
      setSelectedTime(currentTime);
      findFreeLabs(currentDay, currentTime);
    } else {
      setFreeLabs(["Labs are currently closed"]);
      setShowResults(true);
    }
  };

  const handleFindFreeLabsClick = () => {
    if (selectedDay && selectedTime) {
      findFreeLabs(selectedDay, selectedTime);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-8 py-12 md:py-20">

        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            BRACU Lab Buddy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-default-500"
          >
            Find an empty CSE lab room instantly. No more wandering around.
          </motion.p>
        </div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="w-full border-none shadow-2xl bg-content1/80 backdrop-blur-lg">
            <CardHeader className="flex gap-3 px-6 pt-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Search size={24} />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-bold">Find a Room</p>
                <p className="text-small text-default-500">Select day and time to check availability</p>
              </div>
            </CardHeader>
            <CardBody className="space-y-4 px-6 pb-6">
              <Select
                label="Select Day"
                placeholder="Choose a day"
                startContent={<Calendar size={16} className="text-default-400" />}
                selectedKeys={selectedDay ? [selectedDay] : []}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as string;
                  setSelectedDay(key);
                }}
              >
                {days.map((day) => (
                  <SelectItem key={day}>{day}</SelectItem>
                ))}
              </Select>

              <Select
                label="Select Time"
                placeholder="Choose a time"
                startContent={<Clock size={16} className="text-default-400" />}
                selectedKeys={selectedTime ? [selectedTime] : []}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as string;
                  setSelectedTime(key);
                }}
              >
                {times.map((time) => (
                  <SelectItem key={time}>{time}</SelectItem>
                ))}
              </Select>

              <div className="flex flex-col gap-3 pt-2">
                <Button
                  className="w-full font-semibold shadow-lg shadow-primary/20"
                  color="primary"
                  size="lg"
                  isDisabled={!selectedDay || !selectedTime}
                  onPress={handleFindFreeLabsClick}
                  startContent={<Search size={18} />}
                >
                  Find Free Labs
                </Button>
                <div className="relative flex items-center gap-2">
                  <div className="h-px bg-default-200 flex-1" />
                  <span className="text-tiny text-default-400 uppercase font-bold">Or</span>
                  <div className="h-px bg-default-200 flex-1" />
                </div>
                <Button
                  className="w-full font-semibold"
                  color="secondary"
                  variant="flat"
                  size="lg"
                  onPress={findFreeLabsNow}
                  startContent={<Clock size={18} />}
                >
                  Check Current Time
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-3xl"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-transparent" />
                <h3 className="text-xl font-bold text-center">Available Labs</h3>
                <div className="h-1 w-12 rounded-full bg-gradient-to-l from-primary to-transparent" />
              </div>

              {freeLabs.length > 0 ? (
                freeLabs.some((lab) => lab.includes("closed") || lab.includes("Friday")) ? (
                  <div className="flex justify-center">
                    <Card className="bg-warning-50/50 border-warning-200/50 backdrop-blur-md max-w-md w-full">
                      <CardBody className="py-6 flex flex-col items-center gap-3">
                        <div className="p-3 rounded-full bg-warning/20 text-warning-600">
                          <Clock size={32} />
                        </div>
                        <p className="text-warning-700 font-semibold text-lg text-center">
                          {freeLabs[0]}
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center gap-2">
                    {freeLabs.map((lab, index) => (
                      <motion.div
                        key={lab}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card
                          isPressable
                          className="bg-content1 hover:bg-primary/5 border-2 border-transparent hover:border-primary/20 transition-all duration-300 group"
                          shadow="sm"
                        >
                          <CardBody className="py-4 px-2 flex flex-col items-center justify-center gap-2">
                            <MapPin size={20} className="text-default-400 group-hover:text-primary transition-colors" />
                            <p className="text-lg font-bold text-default-700 group-hover:text-primary transition-colors">
                              {lab}
                            </p>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex justify-center">
                  <Card className="bg-danger-50/50 border-danger-200/50 backdrop-blur-md max-w-md w-full">
                    <CardBody className="py-6 flex flex-col items-center gap-3">
                      <div className="p-3 rounded-full bg-danger/20 text-danger-600">
                        <MapPin size={32} />
                      </div>
                      <p className="text-danger-700 font-semibold text-lg text-center">
                        No free labs at this time.
                      </p>
                    </CardBody>
                  </Card>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </DefaultLayout>
  );
}
