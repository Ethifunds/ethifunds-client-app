import classNames from "classnames";

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
};

export default function Container({ children, className }: ContainerProps) {
	const cn = classNames("px-3 lg:p-0 md:max-w-4xl lg:max-w-6xl mx-auto", className);
	return <div className={cn}>{children}</div>;
}
