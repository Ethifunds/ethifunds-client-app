import TodosMessageBoard from "./todos-message-board";
import * as React from "react";
import Spinner from "@/components/spinner";
import { assets } from "@/constants";
import useTodos from "./use-todos";
import ErrorBoundary from "@/components/error-boundary";

export default React.memo(function Todos() {
	const { isFetching, todos } = useTodos();

	return (
		<ErrorBoundary>
			<div className="space-y-10">
				<TodosMessageBoard />
				<div className="space-y-5 p-6 border border-primary rounded-lg">
					<h1 className="highlight-bold text-primary">To-Do list</h1>
					<div className="space-y-3">
						{todos.map((item, idx) => (
							<div key={idx} className="flex items-center gap-5">
								<div>
									{isFetching ? (
										<Spinner />
									) : item.isDone ? (
										<img src={assets.checked_icon} alt="checked" />
									) : (
										<img src={assets.unchecked_icon} alt="unchecked" />
									)}
								</div>{" "}
								<button
									className="content-standard text-neutral-1000 hover:underline disabled:hover:no-underline"
									onClick={() => item.action(item.path)}
									disabled={isFetching || item.isDone}
								>
									{item.title}
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</ErrorBoundary>
	);
});
