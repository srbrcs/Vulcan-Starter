FROM node:8.15.1




WORKDIR /opt/src

RUN chown 1001:0 /opt/src; ls -lah


# Install 'meteor'
RUN curl https://install.meteor.com/ | bash
USER 1001



COPY . .

# Sanity check your Meteor installation
RUN echo -e "\nMeteor version..."; meteor --version; export METEOR_NODE_VERSION=$(meteor node --version);  echo -e "Meteor Node version...\n ${METEOR_NODE_VERSION}";

RUN meteor npm install

RUN meteor update

CMD ["/bin/bash", "-c", "npm start"]
