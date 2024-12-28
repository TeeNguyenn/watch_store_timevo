import React, { ReactNode } from "react";

interface ChangingProgressProviderProps {
    interval?: number;
    values: number[];
    children: (value: number) => ReactNode;
}

interface ChangingProgressProviderState {
    valuesIndex: number;
}

class ChangingProgressProvider extends React.Component<
    ChangingProgressProviderProps,
    ChangingProgressProviderState
> {
    static defaultProps = {
        interval: 1000,
    };

    state: ChangingProgressProviderState = {
        valuesIndex: 0,
    };

    componentDidMount() {
        setInterval(() => {
            this.setState((prevState) => ({
                valuesIndex: (prevState.valuesIndex + 1) % this.props.values.length,
            }));
        }, this.props.interval);
    }

    render() {
        return this.props.children(this.props.values[this.state.valuesIndex]);
    }
}

export default ChangingProgressProvider;
