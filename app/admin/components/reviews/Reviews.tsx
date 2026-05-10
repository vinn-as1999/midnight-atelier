import { IoMdStarOutline, IoMdStarHalf, IoMdStar } from "react-icons/io";
import './reviews.scss';

type Props = {
  rating: number | string | null | undefined;
  size?: 'sm' | 'md';
}

export default function Reviews({ rating, size = 'md' }: Props) {
  const parsedRating = typeof rating === 'string'
    ? Number(rating.replace(',', '.'))
    : Number(rating ?? 0);
  const normalizedRating = Number.isFinite(parsedRating)
    ? Math.max(0, Math.min(5, parsedRating))
    : 0;
  const roundedRating = Math.round(normalizedRating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalf = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const formattedRating = normalizedRating.toFixed(1);

  const stars = [
    ...Array.from({ length: fullStars }, (_, index) => (
      <IoMdStar key={`full-${index}`} />
    )),
    ...(hasHalf ? [<IoMdStarHalf key="half" />] : []),
    ...Array.from({ length: emptyStars }, (_, index) => (
      <IoMdStarOutline key={`empty-${index}`} />
    )),
  ];

  return (
    <section
      className={`reviews-container ${size}`}
      aria-label={`Rating ${formattedRating} out of 5`}
    >
      <span className="review-number">{formattedRating}</span>
      <span className="review-stars" aria-hidden="true">
        {stars}
      </span>
    </section>
  );
}
