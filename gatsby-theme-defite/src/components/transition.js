import React from 'react';
import {
	TransitionGroup,
	Transition as ReactTransition,
} from 'react-transition-group';
class Transition extends React.PureComponent {
	constructor(props) {
		super(props);

		const { timeout = 500 } = props;

		this.getTransitionStyles = {
			entering: {
				position: `absolute`,
				opacity: 0,
			},
			entered: {
				transition: `opacity ${timeout}ms ease-in-out`,
				opacity: 1,
			},
			exiting: {
				transition: `opacity ${timeout}ms ease-in-out`,
				opacity: 0,
			},
		};
	}

	render() {
		const { children, location, timeout = 500 } = this.props;
		return (
			<TransitionGroup>
				<ReactTransition
					key={location.pathname}
					timeout={{
						enter: timeout,
						exit: timeout,
					}}
				>
					{(status) => (
						<div
							style={{
								...this.getTransitionStyles[status],
							}}
						>
							{children}
						</div>
					)}
				</ReactTransition>
			</TransitionGroup>
		);
	}
}
export default Transition;
