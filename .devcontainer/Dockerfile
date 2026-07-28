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
	&& npm install --global pnpm@11.5.3 \
	&& pnpm add --global --allow-build=opencode-ai opencode-ai@1.18.5

COPY --chmod=755 opencode-wrapper /usr/local/bin/opencode
COPY --chown=node:node tmux.conf /home/node/.tmux.conf
