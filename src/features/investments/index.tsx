import useUi from "@/hooks/use-ui";
import InvestmentOpportunity from "./investment-opportunity";
import AppContainer from "@/components/container/container";

export default function Investments() {
	useUi({ title: "invest" });
	return (
		<AppContainer>
			<InvestmentOpportunity scope="2" />
		</AppContainer>
	);
}
