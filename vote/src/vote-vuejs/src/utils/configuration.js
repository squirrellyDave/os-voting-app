/* 
  Helper class to automatically handle development and production environments variables for single page applications (SPAs)
  and client side scripts with auto replacement of that variables on container instantiation to dynamically set it's values
  
  Usage example 
    -> In the configuration.js file, inside the CONFIG() code block use:        
        static get CONFIG() {
            return {
                OPTION_A: '$ENV_VAR_OPTION_A',
                OPTION_B: '$ENV_VAR_OPTION_B',
            };
        }
  
    -> In the .env file use:
        ENV_VAR_OPTION_A=Cats
        ENV_VAR_OPTION_B=Dogs
  
    -> Inside the single page application import the configuration.js and call the variables like below:
        import Configuration from '@/utils/configuration'
        var option_a = Configuration.value('OPTION_A');
        var option_b = Configuration.value('OPTION_B');
  
  For auto replacement inside the SPA implement the entrypoint.sh script inside the Dockerfile at container startup as follows:
      # Copy over startup shell script
      COPY ./entrypoint.sh /
      # Set execution rights for the startup shell script inside the running container
      RUN chmod +x /entrypoint.sh
      # Copy the app files inside the container to the desired location, f.e.:
      COPY <reference to the output of a builing container or path to src files> /app/dist /usr/share/nginx/html
      # For the startup shell script to work, set the rights to create and update files for the folder in wich the app files reside, f.e.:
      RUN chmod -R 777 /usr/share/nginx/html
      # Expose a container port to access its' service
      EXPOSE 8080:8080
      # Call the startup shell script as the container entry point and inside that 
      # script set the really desired container start up command in the last step
      ENTRYPOINT ["/entrypoint.sh"]
      #CMD ["nginx", "-g", "daemon off;"]
*/

import dotenv from "dotenv";
dotenv.config();

export default class Configuration {
  static get CONFIG() {
    return {
      OPTION_A: "$ENV_VAR_OPTION_A",
      OPTION_B: "$ENV_VAR_OPTION_B",
    };
  }

  static value(name) {
    if (!(name in this.CONFIG)) {
      console.log(`Configuration: There is no key named "${name}"`);
      return;
    }

    const value = this.CONFIG[name];

    if (!value) {
      console.log(`Configuration: Value for "${name}" is not defined`);
      return;
    }

    if (value.startsWith("$VUE_APP_")) {
      // Value was not replaced, it seems we are in development.
      // Remove $ and get current value from process.env.
      const envName = value.substr(1);
      const envValue = process.env[envName];
      if (envValue) {
        return envValue;
      } else {
        console.log(
          `Configuration: Environment variable "${envName}" is not defined`
        );
      }
    } else {
      // Value was already replaced, it seems we are in production.
      return value;
    }
  }
}
