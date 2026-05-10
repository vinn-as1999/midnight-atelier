import './admin-header.scss';

type Props = {
  title: string;
  tag?: string;
}

export default function AdminHeader({
  title,
  tag = 'The Midnight Atelier • Operational Overview',
}: Props) {
  return (
    <header className="admin-section-header">
      <h1>{title}</h1>
      <span className="min-tag">{tag}</span>
    </header>
  )
};
