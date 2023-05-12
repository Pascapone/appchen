import pathlib
import argparse
import json
import subprocess


copy_graphql_command = r"xcopy /Q /y .\src\graphql .\amplify\backend\function\{}\lib\graphql /I"
copy_graphql_schema_command = r"xcopy /Q /y .\src\graphql\schema.json .\amplify\backend\function\{}\src\graphql\schema.json"
compile_typescript_command = r"pushd . && cd .\amplify\backend\function\{} && xcopy /y package.json src && cd src && npm install && cd .. && tsc -p .\tsconfig.json && popd"

with open('package.json', 'r') as f:
  data = json.load(f)

def push(args):

  # Push the API to amplify (should be done first, because the graphql schema is used in the typescript functions and it get's pulled from the cloud)
  if args['destroy_graphql']:
    returned_value = subprocess.call("amplify push api --allow-destructive-graphql-schema-updates", shell=True)
  else:
     returned_value = subprocess.call("amplify push api", shell=True)
     
  # Generate the codegen files (should be done after the api is pushed, because it uses the graphql schema from the cloud)
  returned_value = subprocess.call("amplify codegen types", shell=True)
  returned_value = subprocess.call("amplify codegen statements", shell=True)

  # Copy the graphql files to the typescript functions and copy the graphql schema to the typescript functions src directory because it's not beeing copied when compiling the typescript functions
  for functionName in data['graphqlFunctions']:
    print(f"Copying GraphQL to {functionName}...")
    subprocess.call(copy_graphql_command.format(functionName), shell=True)
    subprocess.call("echo D|" + copy_graphql_schema_command.format(functionName), shell=True)

  # If the user only wants to push the api and generate the codegen files, then return
  if args['api']:
    print("Finished pushing API and generating codegen files.")
    return
  
  # Compile the typescript functions
  for functionName in data['typescriptFunctions']:
    print(f"Installing dependencies and compiling {functionName}...")
    returned_value = subprocess.call(compile_typescript_command.format(functionName), shell=True)

  # Push the rest of the project to amplify
  print('Pushing to amplify...')
  returned_value = subprocess.call("amplify push", shell=True) 

  print("--- Finished deploying the project ---")

def execute_command(args):
    match args['command']:
      case 'push':
        push(args)
      case _:
          print('Not a valid command')

if __name__ == '__main__':
  parser = argparse.ArgumentParser(description="Python arguments", formatter_class=argparse.ArgumentDefaultsHelpFormatter)   

  parser.add_argument("command", help="The command that you want to run")
  parser.add_argument('-d', '--destroy-graphql', action='store_true')
  parser.add_argument('-a', '--api', action='store_true')

  args = parser.parse_args() 

  if args.command != 'push' and (args.destroy_graphql):
    parser.error('--destroy-graphql can only be set with the push command.')

  if args.command != 'push' and (args.api):
    parser.error('--api can only be set with the push command.')

  vars = vars(args)
  execute_command(vars)



# --- Arguemnt Parser Commands ---

# Create Flags
# parser.add_argument("-a", "--archive", action="store_true", help="archive mode")

# Optional Arguments
# parser.add_argument("--exclude", help="files to exclude")

# Positional Arguments
# parser.add_argument("dest", help="Destination location")

# Conditional Required Arguments
# parser.add_argument('-a', required='push' == sys.argv[1]) #only required if command is push