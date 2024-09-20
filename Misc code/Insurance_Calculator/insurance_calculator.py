print("PMFBY Insurance Premium Calculator")

crop_area = float(input("Enter the crop area (in hectares or acres): "))
sum_insured = float(input("Enter the sum insured per hectare or acre: "))
premium_rate = float(input("Enter the premium rate (percentage): "))
subsidy_rate = float(input("Enter the subsidy rate (percentage): "))

gross_premium = (premium_rate / 100) * sum_insured * crop_area

subsidy = (subsidy_rate / 100) * gross_premium

net_premium = gross_premium - subsidy

print("\nInsurance Premium Calculation:")
print(f"Gross Premium: ₹{round(gross_premium, 2)}")
print(f"Subsidy: ₹{round(subsidy, 2)}")
print(f"Net Premium: ₹{round(net_premium, 2)}")
