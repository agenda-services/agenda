#!/bin/bash

echo "Checking code for alignment with code rules..."

MODIFIED_FILES=$(git diff --name-only origin/master)

PROCESSED_DIRS=()

for file in $MODIFIED_FILES; do
  dir=$(dirname "$file")

  if [[ "$dir" == "." ]]; then
    continue
  fi

  while [[ "$dir" != "/" ]]; do
    if [[ "$dir" == "." ]]; then
      break
    fi

    if [[ -f "$dir/package.json" ]]; then
      if [[ ! " ${PROCESSED_DIRS[@]} " =~ " $dir " ]]; then
        echo "Running lint for project in $dir..."
        OUTPUT=$(cd "$dir" && npm i && npm run lint)
        echo "$OUTPUT"

        if echo "$OUTPUT" | grep -q "error"; then
          echo "Linting errors found in $dir. Exiting with error."
          exit 1
        fi

        PROCESSED_DIRS+=("$dir")
      fi
      break
    fi

    dir=$(dirname "$dir")
  done
done
