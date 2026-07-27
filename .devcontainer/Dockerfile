FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH=$PNPM_HOME/bin:$PNPM_HOME:$PATH

RUN corepack enable \
	&& corepack install --global pnpm@11.5.3 \
	&& ln -sf /usr/local/bin/pnpm /usr/local/share/npm-global/bin/pnpm \
	&& pnpm add --global opencode-ai@latest \
	&& node /usr/local/share/pnpm/global/v11/*/node_modules/opencode-ai/postinstall.mjs

COPY --chmod=755 opencode-wrapper /usr/local/share/npm-global/bin/opencode
