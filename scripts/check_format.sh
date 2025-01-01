#!/bin/bash
echo "Checking for CRLF line endings in modified files..."

MODIFIED_FILES=$(git diff --name-only origin/master)

FAILED=0
for FILE in $MODIFIED_FILES; do
  if file "$FILE" | grep -q "CRLF"; then
    echo $FILE
    echo "❌ Error: File '$FILE' has CRLF line endings."
    FAILED=1
  fi
done

if [ "$FAILED" -eq 1 ]; then
  echo "❌ There are files with CRLF line endings. Exiting..."
  exit 1
else
  echo "✅ All files have LF line endings."
fi