"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ScenarioInfoCardProps {
  service: string;
  callId: string;
  subject: string;
  notes: string;
}

export function ScenarioInfoCard({ service, callId, subject, notes }: ScenarioInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-4 left-4 z-10"
    >
      <Card className="w-72 shadow-lg">
        <div className="p-3">
          <h3 className="font-semibold mb-1.5 text-xs">Scenario Details</h3>
          <div className="space-y-0.5 text-xs text-muted-foreground">
            <p>
              <span className="font-medium">Service:</span> {service}
            </p>
            <p>
              <span className="font-medium">Case ID:</span> {callId}
            </p>
            <p>
              <span className="font-medium">Subject:</span> {subject}
            </p>
            <p className="text-xs pt-1.5 mt-1.5 border-t">{notes}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

