#!/bin/bash
echo "Checking commits..."

PATTERN_START="^[A-Z]"
PATTERN_WHAT="What:.+"
PATTERN_WHY="Why:.+"
PATTERN_TICKET="[A-Za-z0-9]+-[A-Za-z0-9]+"

START_DATE="2025-01-01  00:00:00"

COMMITS=$(git log --since="$START_DATE" --pretty=format:"%h%n%s%n%b%n---")
COMMIT_HASH=""
COMMIT_MESSAGE=""

VALID=true
SHOW_COMMIT=false
TITLES=()

while read -r line; do
  SHOW_COMMIT=false

  if [[ "$line" != "---" ]]; then
    if [[ -z "$COMMIT_HASH" ]]; then
      COMMIT_HASH="$line"
      continue
    fi

    COMMIT_MESSAGE+="$line"$'\n'
    continue
  fi


  if [[ "$COMMIT_MESSAGE" == *"Merge"* ]]; then
    COMMIT_HASH=""
    COMMIT_MESSAGE=""
    continue
  fi

  if [[ ! "$COMMIT_MESSAGE" =~ $PATTERN_START ]]; then
    echo "❌ Error: doesn't start with an uppercase letter."
    VALID=false
    SHOW_COMMIT=true
  fi

  if [[ ! "$COMMIT_MESSAGE" =~ $PATTERN_WHAT ]]; then
    echo "❌ Error: is missing a 'What:' message."
    VALID=false
    SHOW_COMMIT=true
  fi

  if [[ ! "$COMMIT_MESSAGE" =~ $PATTERN_WHY ]]; then
    echo "❌ Error: is missing a 'Why:' message."
    VALID=false
    SHOW_COMMIT=true
  fi

  if [[ ! "$COMMIT_MESSAGE" =~ $PATTERN_TICKET ]]; then
    echo "❌ Error: is missing a valid ticket (e.g., AG-34)."
    VALID=false
    SHOW_COMMIT=true
  fi

  title=$(echo "$COMMIT_MESSAGE" | awk  '
    BEGIN { RS="What|Why"; ORS="" } # Dividir en secciones usando "What" como delimitador
    NR == 1 { print }          # Imprimir solo la primera sección
  ')

  for item in "$TITLES"; do
    if [[ "$item" == "$title" ]]; then
      echo "❌ Error: commit title is repeated"
      VALID=false
      SHOW_COMMIT=true
      break
    fi
  done

  TITLES+=$title

  if [[ "$SHOW_COMMIT" == true ]]; then
    echo "📄 Commit '$COMMIT_HASH':"$'\n'
    echo "$COMMIT_MESSAGE"
    echo "========================="
  fi


  COMMIT_HASH=""
  COMMIT_MESSAGE=""

done <<< "$COMMITS"

if [ "$VALID" = true ]; then
  echo "✅ All commits are valid."
  exit 0
else
  echo "❌ Some commits are invalid."
  exit 1
fi
