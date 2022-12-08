import path from "path";
import { CracoConfig } from "@craco/types/dist";

const Config: CracoConfig = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@constants": path.resolve(__dirname, "src/constants"),
            "@containers": path.resolve(__dirname, "src/containers"),
            "@contexts": path.resolve(__dirname, "src/contexts"),
            "@layouts": path.resolve(__dirname, "src/layouts"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@routes": path.resolve(__dirname, "src/routes"),
            "@services": path.resolve(__dirname, "src/services"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@utilities": path.resolve(__dirname, "src/utilities"),
        },
    },
    devServer: {
        port: 9001,
    },
};

export default Config;
