"use client";

import { Gauge } from "@/components/Gauge";

export function GaugeCluster() {
  return (
    <div className="gauge-cluster">
      <div className="gauge-vent gauge-vent-left" />
      <Gauge id="anom" size="sm" max={10} value={7} digitalLabel="ANOMALIES" digitalValue="7" unitLabel="ACTIVE" delay={100} />
      <Gauge id="thru" size="md" max={10} value={7.8} digitalLabel="THROUGHPUT" digitalValue="1,947" unitLabel="RECORDS/SEC" delay={300} />
      <Gauge id="rpm" size="lg" max={8} value={6.4} tickStep={1} redlineFrom={6.5} digitalLabel="SIGNAL" digitalValue="6,412" unitLabel="×1000/MIN" delay={550} />
      <Gauge id="impact" size="md" max={10} value={5.7} digitalLabel="IMPACT" digitalValue="$284K" unitLabel="IDENTIFIED" delay={300} />
      <Gauge id="sync" size="sm" max={10} value={2} digitalLabel="SYNC" digitalValue="8 SEC" unitLabel="LAST PULL" delay={100} />
      <div className="gauge-vent gauge-vent-right" />
    </div>
  );
}
