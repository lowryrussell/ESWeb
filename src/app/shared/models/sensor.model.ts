export interface Sensor {
  nodeId: number;
  timestamp: string;  // datetime
  altitude: number;
  humidity: number;
  pressure: number;
  temp: number;
}
