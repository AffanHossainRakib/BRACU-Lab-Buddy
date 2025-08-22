import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";

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
        // Handle error silently or show user-friendly message
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
      // Auto-select current day and time in dropdowns
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
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">

        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-xl font-semibold">Find a Free Lab Room: CSE Only</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Select
              label="Select Day"
              placeholder="Choose a day"
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

            <div className="flex flex-col gap-2">
              <Button
                className="w-full"
                color="primary"
                isDisabled={!selectedDay || !selectedTime}
                onPress={handleFindFreeLabsClick}
              >
                Find Free Labs
              </Button>
              <Button
                className="w-full"
                color="success"
                variant="bordered"
                onPress={findFreeLabsNow}
              >
                Find Now
              </Button>
            </div>
          </CardBody>
        </Card>

        {showResults && (
          <div className="w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-center mb-4">
              Available Labs
            </h3>
            {freeLabs.length > 0 ? (
              freeLabs.some(
                (lab) => lab.includes("closed") || lab.includes("Friday"),
              ) ? (
                <div className="flex justify-center">
                  <Card className="bg-warning-50 border-warning-200 max-w-md">
                    <CardBody className="py-3">
                      <p className="text-warning-700 font-medium text-center">
                        {freeLabs[0]}
                      </p>
                    </CardBody>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {freeLabs.map((lab, index) => (
                    <Card
                      key={index}
                      className="bg-success-50 border-success-200 hover:bg-success-100 transition-colors"
                      shadow="sm"
                    >
                      <CardBody className="py-3 px-4">
                        <p className="text-success-700 font-medium text-sm text-center">
                          {lab}
                        </p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )
            ) : (
              <div className="flex justify-center">
                <Card className="bg-danger-50 border-danger-200 max-w-md">
                  <CardBody className="py-3">
                    <p className="text-danger-700 font-medium text-center">
                      No free labs at this time.
                    </p>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
