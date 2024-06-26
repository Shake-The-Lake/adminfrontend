
FROM node:lts AS development

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci
COPY . /code

ENV CI=true
ENV PORT=3000

CMD [ "npm", "start" ]

FROM development AS dev-envs
RUN <<EOF
apt-get update
apt-get install -y git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

FROM development AS build

ENV VITE_APP_BASE_URL=https://api.shake-the-lake.ch
RUN ["npm", "run", "build"]

FROM nginx:1.13-alpine

# Configure nginx so that subroutes are always served the index.html
COPY default.conf /etc/nginx/conf.d/
COPY --from=build /code/build /usr/share/nginx/html