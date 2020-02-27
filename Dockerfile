FROM srbrcs/vjs:latest

COPY . .
USER 0
RUN ls -lah ; chown -R 1001:0 .; ls -lah
USER 1001
# Sanity check your Meteor installation
RUN echo -e "\nMeteor version..."; meteor --version; export METEOR_NODE_VERSION=$(meteor node --version);  echo -e "Meteor Node version...\n ${METEOR_NODE_VERSION}";

RUN meteor npm install

RUN meteor update

EXPOSE 3000

CMD ["/bin/bash", "-c", "npm start"]
