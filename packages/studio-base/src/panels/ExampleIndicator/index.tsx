import { useCrash } from "@foxglove/hooks";
import { PanelExtensionContext } from "@foxglove/studio";
import Panel from "@foxglove/studio-base/components/Panel";
import { PanelExtensionAdapter } from "@foxglove/studio-base/components/PanelExtensionAdapter";
import { initPanel } from "@foxglove/studio-base/panels/Map/initPanel";
import { SaveConfig } from "@foxglove/studio-base/types/panels";
import { useMemo } from "react";

function ExampleIndicator(context: PanelExtensionContext) {
    return (
        <h1>Hello World!</h1>
    );
}

type Props = {
    config: string;
    saveConfig: SaveConfig<string>;
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
