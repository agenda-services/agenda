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


  if [[ "$COMMIT_MESSAGE" == *"Merge pull request"* ]]; then
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
