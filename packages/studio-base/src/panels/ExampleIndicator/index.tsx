import { StrictMode, useEffect, useLayoutEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

import { useCrash } from "@foxglove/hooks";
import { PanelExtensionContext } from "@foxglove/studio";
import { CaptureErrorBoundary } from "@foxglove/studio-base/components/CaptureErrorBoundary";
import Panel from "@foxglove/studio-base/components/Panel";
import { PanelExtensionAdapter } from "@foxglove/studio-base/components/PanelExtensionAdapter";
import ThemeProvider from "@foxglove/studio-base/theme/ThemeProvider";
import { SaveConfig } from "@foxglove/studio-base/types/panels";

type IntMsg = {
    data: number;
}

function ExampleIndicator({context}: {context: PanelExtensionContext}) {
    const [value, setValue] = useState<IntMsg>({data: 0});
    const [renderDone, setRenderDone] = useState<(() => void)>(()=>{});

    useLayoutEffect(() => {
        context.onRender = (renderState, done) => {
            setRenderDone(() => done);
            if (renderState.currentFrame && renderState.currentFrame.length > 0) {
                setValue(renderState.currentFrame.at(0)?.message as IntMsg);
            }
        }
        context.subscribe([{topic:"/test/int"}]);
        context.watch("currentFrame");
    }, [context])

    useEffect(() => {
        renderDone?.();
    }, [renderDone]);

    return (
        <div style={{margin: "5px"}}>
            <h1>Hello World!</h1>
            <p>{value.data}</p>
            <div style={{background:(value.data > 20 ? "red": "green"), borderRadius: "10px", width:20, height:20}}></div>
        </div>
    );
}

function initPanel(crash: ReturnType<typeof useCrash>, context: PanelExtensionContext) {
    // eslint-disable-next-line react/no-deprecated
    ReactDOM.render(
      <StrictMode>
        <CaptureErrorBoundary onError={crash}>
          <ThemeProvider isDark>
            <ExampleIndicator context={context} />
          </ThemeProvider>
        </CaptureErrorBoundary>
      </StrictMode>,
      context.panelElement,
    );
    return () => {
      // eslint-disable-next-line react/no-deprecated
      ReactDOM.unmountComponentAtNode(context.panelElement);
    };
}

export type Config = {
    path: string;
};

type Props = {
    config: Config;
    saveConfig: SaveConfig<Config>;
};

function ExamplePanelAdapter(props: Props) {
    const crash = useCrash();
    const boundInitPanel = useMemo(() => initPanel.bind(undefined, crash), [crash]);

    return (
        <PanelExtensionAdapter
            config={props.config}
            saveConfig={props.saveConfig}
            initPanel={boundInitPanel}
            highestSupportedConfigVersion={1}
        />
    );
}
ExamplePanelAdapter.panelType = "exampleIndicator";
ExamplePanelAdapter.defaultConfig = {};

export default Panel(ExamplePanelAdapter);
