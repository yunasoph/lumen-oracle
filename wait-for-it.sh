#!/usr/bin/env sh

set -e

TARGET="$1"
shift

if [ -z "$TARGET" ]; then
  echo "Usage: wait-for-it.sh host:port -- command"
  exit 1
fi

HOST="${TARGET%:*}"
PORT="${TARGET#*:}"

if [ "$1" = "--" ]; then
  shift
fi

until nc -z "$HOST" "$PORT" >/dev/null 2>&1; do
  echo "Waiting for $HOST:$PORT..."
  sleep 1
done

exec "$@"
