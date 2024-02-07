'use client';

type LastUpdateProps = {
  lastUpdated: string | null | undefined;
};

export default function LastUpdated({ lastUpdated }: LastUpdateProps) {
  if (!lastUpdated) {
    return null;
  }
  return <h2>as of {new Date(lastUpdated).toLocaleString()}</h2>;
}
