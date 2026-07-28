FROM mcr.microsoft.com/devcontainers/javascript-node:24-bookworm@sha256:df5c21fdbb9cfa3ee2aae7f05499af7acf073597d250d07476df2d8515c4b853

ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH=$PNPM_HOME/bin:$PNPM_HOME:$PATH

RUN corepack enable \
	&& corepack install --global pnpm@11.5.3 \
	&& ln -sf /usr/local/bin/pnpm /usr/local/share/npm-global/bin/pnpm \
	&& pnpm add --global --allow-build=opencode-ai opencode-ai@1.18.5

COPY --chmod=755 opencode-wrapper /usr/local/share/npm-global/bin/opencode
