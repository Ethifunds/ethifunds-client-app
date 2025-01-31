import { Badge } from "@/components/ui/badge";
import { assets } from "@/constants";
import { BankAccount } from "@/types/bank-account.types";

type AccountCardProps = BankAccount & {
	select(id: number): void;
	selected: boolean;
};
export default function AccountCard(props: AccountCardProps) {
	const select = () => {
		props.select(props.id);
	};
	return (
		<div onClick={select} className="relative flex gap-2 border rounded-lg p-3 hover:border-neutral-900 transition-all cursor-pointer">
			<div className="">
				<Badge
					variant={"outline"}
					className="flex justify-center items-center !rounded-full size-5 !p-0 border-neutral-900"
				>
					{props.selected && <Badge className="size-3 !p-0 rounded-full" />}
				</Badge>
			</div>
			<div className="flex items-center gap-3 capitalize w-full">
				<div className="flex items-center justify-center border border-neutral-900 rounded-full !p-1 size-10">
					<img src={assets.bank_01} alt="bank icon" className="object-cover size-full" />
				</div>

				<div className="space-y-3 grow">
					<h1 className="content-bold text-neutral-1000 line-clamp-1">
						{props.account_name.toLocaleLowerCase()}
					</h1>
					<div className="flex gap-1 w-full">
						<span className="content-accent text-neutral-500">{props.account_number}</span>
						<span className="flex-1 text-right content-accent text-neutral-500 line-clamp-1">
							{props.bank_name}
						</span>
					</div>
				</div>

				{/* <div>
					<span className="content-accent text-neutral-500">{props.bank_name}</span>
				</div> */}
			</div>
		</div>
	);
}
