import I18n from "./i18n";

const smellTypes = [
	"unclear",
	"sewage",
	"manure",
	"burningRubber",
	"hydrogenSulfide",
	"treatmentFacilities",
	"tannery"
];

export const getTranslatedSmellTypes = () => {
	return smellTypes.map(v => {
		return  { label: I18n.t(v), value: I18n.t(v) }
	});
};

export default smellTypes;