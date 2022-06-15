export interface DMVehicle {
  id: string;
  device_key: string;
  vin: string;
  vehicle_make: string;
  vehicle_name: string;
  create_date: Date | string;
  update_date: Date | string;
  last_movement_timestamp: Date | string;
  runtime: number;
  initial_runtime: number;
  vehicle_model: string;
  vehicle_license_plate: string;
  vehicle_year: string;
  subscriber_id: number;
  image: string;
  last_known_state: LastKnownState;
  custom_fields: CustomFields;
  towing_detected: boolean;
  crash_detected: any;
  dtc_codes: any;
  dtc_error_count: any;
  hard_braking: any;
  hard_cornering: any;
  harsh_acceleration: any;
  normal_start_mode_status: boolean;
  panic_status: boolean;
  remote_start_status: boolean;
  tach_learning_status: boolean;
  temperature_start_mode_status: boolean;
  timer_start_mode_status: boolean;
  trigger_start_mode_status: boolean;
  turbo_start_mode_status: boolean;
  turbo_status: boolean;
  battery_off: boolean;
  battery_reconnected: boolean;
  low_battery: boolean;
  service_due: boolean;
  starting_mileage: number;
  pricing_plan: PricingPlan;
  is_pending_transfer: boolean;
  new_pending_owner: any;
  hardwired_configuration: HardwiredConfiguration;
  keylocker: Keylocker;
  touchpad: TouchPad;
  local_event_rules: any;
  in_geofence: boolean;
  dealer_profile: any;
  current_geofences: Array<any>;
  custom_ui: CustomUI;
}

interface LastKnownState {
  i_o_status: IOStatus;
  imei: string;
  iccid: string;
  carrier: string;
  ble_mac_address: string;
  firmware_version: string;
  ble_firmware_version: number;
  controller_model: string;
  controller_version: number;
  current_cellular_network: number;
  cellular_signal_strength: number;
  backup_battery_voltage: number;
  timestamp: Date | string;
  latitude: number;
  longitude: number;
  speed: number;
  gps_direction: string;
  gps_degree: number;
  mileage: number;
  controller: Controller;
}

interface IOStatus {
  poc_1_configuration: number;
  poc_2_configuration: number;
  poc_3_configuration: number;
  pic_1_configuration: number;
  fota_status: boolean;
  backup_battery_status: boolean
}

interface CustomFields {
  field_1: any;
  field_2: any;
  field_3: any;
  field_4: any;
  field_5: any
}

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  billing_model: string;
  local_events: boolean;
  location_services: boolean;
  motion_reporting: boolean;
  audit_log: boolean;
  trip_reporting: boolean;
  dtc_events: boolean;
  speed_limit_api: boolean;
  autorenewal: boolean;
  image: string;
  is_trial: boolean;
  plan_activation_date: Date | string;
  plan_renewal_date: Date | string;
}

interface HardwiredConfiguration {
  hardwired_mode: boolean;
  poc_1_label: string;
  poc_2_label: string;
  poc_3_label: string;
  pic_1_label: string;
}

interface Keylocker {
  keylocker_roof_open: any;
  keylocker_key_present: any;
  keylocker_button_disabled: any;
  keylocker_button_is_controllable: any;
  keylocker_armed: any;
  remote_disarms_keylocker: any;
  mode: any;
  version: any;
}

interface TouchPad {
  master_pin_set: boolean;
  master_pin_encrypted: any;
  secondary_pin_set: boolean;
  secondary_pin_encrypted: any;
  secondary_pin_start_date: any;
  secondary_pin_end_date: any;
  is_touchpad_secondary_pin_shared: boolean;
}

interface CustomUI {
  pages: [
    {
      location_1: {
        control: string;
      },
      location_2: {
        control: string
      },
      location_3: {
        icon: string;
        control: string
      }
    },
    {
      location_1: {
        control: string;
      }
    }
  ],
  layout_name: string;
}

export interface DMLocationReport {
  device_key: string;
  parsed: Parsed;
}

interface Parsed {
  backup_battery_voltage: number;
  cellular_signal_strength: number;
  command_name: string;
  command_sent: string;
  command_success: boolean;
  command_timestamp: Date | string;
  controller: Controller;
  gps_degree: number;
  gps_direction: string;
  gps_status: number;
  latitude: number;
  longitude: number;
  mileage: number;
  runtime: number;
  speed: number;
  timestamp: Date | string;
}

interface Controller {
  armed: boolean;
  door_open: boolean;
  trunk_open: boolean;
  hood_open: boolean;
  engine_on: boolean;
  ignition_on: boolean;
  reservation_status: boolean;
  timer_start_enabled: boolean;
  siren_enabled: boolean;
  shock_sensor_enabled: boolean;
  turbo_timer_start_enabled: boolean;
  passive_arming_enabled: boolean;
  valet_mode_enabled: boolean;
  auto_door_lock_enabled: boolean;
  drive_lock_enabled: boolean;
  current_temperature: any;
  main_battery_voltage: number;
}

export interface GetVehiclesDTO {
  count: number;
  next: any;
  previous: any;
  results: Array<DMVehicle>;
}
