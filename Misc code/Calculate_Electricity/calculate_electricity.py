def calculate_energy_usage(voltage, current, power_factor, time_hours):
    power_watts = voltage * current * power_factor
    
    energy_kwh = (power_watts * time_hours) / 1000
    
    return energy_kwh

voltage = float(input("Enter the voltage (in volts): "))
current = float(input("Enter the current (in amperes): "))
power_factor = float(input("Enter the power factor (0 to 1): "))
time_hours = float(input("Enter the time (in hours): "))

energy_used = calculate_energy_usage(voltage, current, power_factor, time_hours)

print(f"Energy used by the motor: {energy_used:.2f} kWh")
