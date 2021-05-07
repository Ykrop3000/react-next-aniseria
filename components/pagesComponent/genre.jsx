import Link from "next/link";

export default function Genre({ genre }) {
  return (
    <>
      <Link href={`/animes?genre=${genre.id}`}>
        <a>
          <span className="genre">{genre.russian}</span>
        </a>
      </Link>

      <style jsx>{`
        .genre {
          color: inherit;
          font-size: 0.875rem;
          font-weight: 400;
          background-color: rgba(120, 120, 130, 0.07);
          line-height: 1;
          white-space: nowrap;
          margin-right: 3px;
          border-radius: 12px;
          text-transform: none;
          vertical-align: baseline;
          text-align: center;
          margin: 2px;
          display: inline-block;
          padding: 7px 12px;
        }
      `}</style>
    </>
  );
}
