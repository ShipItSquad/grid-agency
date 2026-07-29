FROM golang:1.26.0-bookworm@sha256:2a0ba12e116687098780d3ce700f9ce3cb340783779646aafbabed748fa6677c AS ts-unplug-builder

RUN GOBIN=/out CGO_ENABLED=0 go install github.com/tailscale/ts-plug/cmd/ts-unplug@1937455808f0f536ab2a32ffe9507e268979d6ea

FROM node:24-bookworm-slim@sha256:6f7b03f7c2c8e2e784dcf9295400527b9b1270fd37b7e9a7285cf83b6951452d

ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH=$PNPM_HOME/bin:$PNPM_HOME:$PATH

RUN apt-get update \
	&& apt-get install --yes --no-install-recommends \
		ca-certificates \
		curl \
		git \
		less \
		openssh-client \
		procps \
		ripgrep \
		sudo \
		tmux \
	&& echo "node ALL=(root) NOPASSWD:ALL" >/etc/sudoers.d/node \
	&& chmod 0440 /etc/sudoers.d/node \
	&& rm -rf /var/lib/apt/lists/* \
	&& corepack disable \
	&& npm install --global pnpm@11.5.3 @infisical/cli@0.43.114 @openai/codex@0.145.0 \
	&& mv /usr/local/bin/codex /usr/local/bin/codex-real \
	&& pnpm add --global --allow-build=opencode-ai opencode-ai@1.18.5

COPY --from=ts-unplug-builder /out/ts-unplug /usr/local/bin/ts-unplug
COPY --chmod=755 codex-wrapper /usr/local/bin/codex
COPY --chmod=755 opencode-wrapper /usr/local/bin/opencode
COPY --chmod=755 start-aperture-bridge /usr/local/bin/start-aperture-bridge
COPY --chmod=755 start-aperture-bridge-encrypted /usr/local/bin/start-aperture-bridge-encrypted
COPY --chmod=755 with-infisical /usr/local/bin/with-infisical
COPY --chown=node:node tmux.conf /home/node/.tmux.conf
COPY tmux.conf /root/.tmux.conf
