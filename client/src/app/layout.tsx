import '../styles/globals.scss';
import { Header, Sidebar } from 'components';
import CategoryService from 'services/category.service';
import { Providers } from 'store/provider';

async function getCategories() {
  const categories = await CategoryService.getAll();

  return categories;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCategories();

  return (
    <html lang="ua">
      <body className="bg-secondaryDark">
        <Providers>
          <Header />
          <Sidebar categories={data} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
