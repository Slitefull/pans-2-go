interface SelectValues<L = TypesOfServiceLabels, V = TypesOfServiceValues> {
  label: L;
  value: V;
}

export enum TypesOfServiceLabels {
  AllServices = "All Services",
  Tires = "Tires",
  Wipers = "Wipers",
  Oils = "Oils",
  BrakePads = "Brake Pads",
  Rotors = "Rotors",
  Headlights = "Headlights",
  Filters = "Filters",
  CabinFilter = "Cabin Filter",
}

export enum TypesOfServiceValues {
  AllServices = "AllServices",
  Tires = "Tires",
  Wipers = "Wipers",
  Oils = "Oils",
  BrakePads = "BrakePads",
  Rotors = "Rotors",
  Headlights = "Headlights",
  Filters = "Filters",
  CabinFilter = "CabinFilter",
}

export const TypesOfServiceRecord: Record<TypesOfServiceValues, SelectValues> = {
  [TypesOfServiceValues.AllServices]: {
    label: TypesOfServiceLabels.AllServices,
    value: TypesOfServiceValues.AllServices,
  },
  [TypesOfServiceValues.Tires]: {
    label: TypesOfServiceLabels.Tires,
    value: TypesOfServiceValues.Tires,
  },
  [TypesOfServiceValues.Wipers]: {
    label: TypesOfServiceLabels.Wipers,
    value: TypesOfServiceValues.Wipers,
  },
  [TypesOfServiceValues.Oils]: {
    label: TypesOfServiceLabels.Oils,
    value: TypesOfServiceValues.Oils,
  },
  [TypesOfServiceValues.BrakePads]: {
    label: TypesOfServiceLabels.BrakePads,
    value: TypesOfServiceValues.BrakePads,
  },
  [TypesOfServiceValues.Rotors]: {
    label: TypesOfServiceLabels.Rotors,
    value: TypesOfServiceValues.Rotors,
  },
  [TypesOfServiceValues.Headlights]: {
    label: TypesOfServiceLabels.Headlights,
    value: TypesOfServiceValues.Headlights,
  },
  [TypesOfServiceValues.Filters]: {
    label: TypesOfServiceLabels.Filters,
    value: TypesOfServiceValues.Filters,
  },
  [TypesOfServiceValues.CabinFilter]: {
    label: TypesOfServiceLabels.CabinFilter,
    value: TypesOfServiceValues.CabinFilter,
  },
};

export const TypesOfServiceSelectValues: Array<SelectValues> = Object.values(TypesOfServiceRecord).map((area) => ({
  label: area.label,
  value: area.value,
}))

export const FilteredTypesOfServiceSelectValues = TypesOfServiceSelectValues.filter((element) => element.value !== TypesOfServiceValues.AllServices);
