function root({shop, url}) {
  return {
    title: shop?.name,
    titleTemplate: '%s | Super Coffee',
    description: truncate(
      shop?.description ??
        'SuperCoffee: O Energy Boost #1 do Mundo. Ideal para o Pré e Pós-Treino, Estudos ou Trabalho, Potencialize seu Desempenho!',
    ),
    handle: '@supercoffeebr',
    url,
    robots: {
      noIndex: false,
      noFollow: false,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: shop.name,
      logo: shop.brand?.logo?.image?.url,
      image: shop.brand?.logo?.image?.url,
      sameAs: [
        'https://x.com/supercoffeebr',
        'https://www.instagram.com/supercoffeebr',
        'https://www.tiktok.com/@supercoffeebr',
      ],
      url,
      description:
        shop?.description ??
        'SuperCoffee: O Energy Boost #1 do Mundo. Ideal para o Pré e Pós-Treino, Estudos ou Trabalho, Potencialize seu Desempenho!',
      // needs to be updated
      email: 'contact@example.com',
      telephone: '+47-99-999-9999',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+9-999-999-9999',
        email: 'contact@example.com',
      },
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: '999 W Example St Suite 99 Unit 9',
          addressLocality: 'New York',
          addressRegion: 'NY',
          postalCode: '10019',
          addressCountry: 'US',
        },
        {
          streetAddress: '999 Rue due exemple',
          addressLocality: 'Paris',
          postalCode: '75001',
          addressCountry: 'FR',
        },
      ],
    },
  };
}

function home({url, faq}) {
  return {
    title: 'Home',
    titleTemplate: '%s | Super Coffee',
    description:
      'SuperCoffee: O Energy Boost #1 do Mundo. Ideal para o Pré e Pós-Treino, Estudos ou Trabalho, Potencialize seu Desempenho!',
    robots: {
      noIndex: false,
      noFollow: false,
    },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Supper Coffee',
        alternateName: 'EC',
        url: url,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${url}search?q={search_term}`,
          },
          'query-input': 'required name=search_term',
        },
      },
      // uncomment and test this once we added FAQs page in shopify admin
      // {
      //   '@context': 'https://schema.org',
      //   '@type': 'FAQPage',
      //   mainEntity: parseFAQs(faq?.body).map((item) => {
      //     return {
      //       '@type': 'Question',
      //       name: item.question,
      //       acceptedAnswer: {
      //         '@type': 'Answer',
      //         text: item.answer,
      //       },
      //     };
      //   }),
      // },
    ],
  };
}

function productJsonLd({product, selectedVariant, url, faq}) {
  const origin = new URL(url).origin;
  const variants = product.variants.nodes;
  const description = truncate(
    product?.seo?.description ?? product?.description,
  );
  const offers = (variants || []).map((variant) => {
    const variantUrl = new URL(url);
    for (const option of variant.selectedOptions) {
      variantUrl.searchParams.set(option.name, option.value);
    }
    const availability = variant.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';

    return {
      '@type': 'Offer',
      availability,
      price: parseFloat(variant.price.amount),
      priceCurrency: variant.price.currencyCode,
      sku: variant?.sku ?? '',
      url: variantUrl.toString(),
    };
  });
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Products',
          item: `${origin}/products`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: product.title,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      brand: {
        '@type': 'Brand',
        name: product.vendor,
      },
      description,
      image: [selectedVariant?.image?.url ?? ''],
      name: product.title,
      offers,
      sku: selectedVariant?.sku ?? '',
      url,
      // the review part, when we add product reviews
      // review: {
      //   "@type": "Review",
      //   reviewRating: {
      //     "@type": "Rating",
      //     ratingValue: 4,
      //     bestRating: 5,
      //   },
      //   author: {
      //     "@type": "Person",
      //     name: "Fred Benson",
      //   },
      // },
      // aggregateRating: {
      //   "@type": "AggregateRating",
      //   ratingValue: 4.4,
      //   reviewCount: 89,
      // },
      // uncomment and test this once we added FAQs page in shopify admin
      // {
      //   '@context': 'https://schema.org',
      //   '@type': 'FAQPage',
      //   mainEntity: parseFAQs(faq?.body).map((item) => {
      //     return {
      //       '@type': 'Question',
      //       name: item.question,
      //       acceptedAnswer: {
      //         '@type': 'Answer',
      //         text: item.answer,
      //       },
      //     };
      //   }),
      // },
    },
  ];
}

function product({product, url, selectedVariant}) {
  const description = truncate(
    product?.seo?.description ?? product?.description ?? '',
  );
  return {
    title: product?.seo?.title ?? product?.title,
    description,
    media: selectedVariant?.image,
    jsonLd: productJsonLd({product, selectedVariant, url}),
  };
}

function collectionJsonLd({url, collection}) {
  const siteUrl = new URL(url);
  const itemListElement = collection.products.nodes.map((product, index) => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      url: `/products/${product.handle}`,
    };
  });

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Collections',
          item: `${siteUrl.host}/collections`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: collection.title,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: collection?.seo?.title ?? collection?.title ?? '',
      description: truncate(
        collection?.seo?.description ?? collection?.description ?? '',
      ),
      image: collection?.image?.url,
      url: `/collections/${collection.handle}`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement,
      },
    },
  ];
}

function collection({collection, url}) {
  return {
    title: collection?.seo?.title,
    description: truncate(
      collection?.seo?.description ?? collection?.description ?? '',
    ),
    titleTemplate: '%s | Collection',
    media: {
      type: 'image',
      url: collection?.image?.url,
      height: collection?.image?.height,
      width: collection?.image?.width,
      altText: collection?.image?.altText,
    },
    jsonLd: collectionJsonLd({collection, url}),
  };
}

function collectionsJsonLd({url, collections}) {
  const itemListElement = collections.nodes.map((collection, index) => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      url: `/collections/${collection.handle}`,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Collections',
    description: 'All collections',
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement,
    },
  };
}

function listCollections({collections, url}) {
  return {
    title: 'Collections',
    titleTemplate: '%s | Super Coffee',
    description: 'All collections',
    url,
    jsonLd: collectionsJsonLd({collections, url}),
  };
}

function article({article, url}) {
  return {
    title: article?.seo?.title ?? article?.title,
    description: truncate(article?.seo?.description ?? ''),
    titleTemplate: '%s | Journal',
    url,
    media: {
      type: 'image',
      url: article?.image?.url,
      height: article?.image?.height,
      width: article?.image?.width,
      altText: article?.image?.altText,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      alternativeHeadline: article.title,
      articleBody: article.contentHtml,
      datePublished: article?.publishedAt,
      description: truncate(
        article?.seo?.description || article?.excerpt || '',
      ),
      headline: article?.seo?.title || '',
      image: article?.image?.url,
      url,
    },
  };
}

function blog({blog, url}) {
  return {
    title: blog?.seo?.title,
    description: truncate(blog?.seo?.description || ''),
    titleTemplate: '%s | Blog',
    url,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: blog?.seo?.title || blog?.title || '',
      description: blog?.seo?.description || '',
      url,
    },
  };
}

function page({page, url}) {
  return {
    description: truncate(page?.seo?.description || ''),
    title: page?.seo?.title ?? page?.title,
    titleTemplate: '%s | Super Coffee',
    url,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
    },
  };
}

function policy({policy, url}) {
  return {
    description: truncate(policy?.body ?? ''),
    title: policy?.title,
    titleTemplate: '%s | Super Coffee',
    url,
  };
}

function policies({policies, url}) {
  const origin = new URL(url).origin;
  const itemListElement = policies.filter(Boolean).map((policy, index) => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: policy.title,
      item: `${origin}/policies/${policy.handle}`,
    };
  });
  return {
    title: 'Policies',
    titleTemplate: '%s | Policies',
    description: 'Super Coffee policies',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        description: 'Hydrogen store policies',
        name: 'Policies',
        url,
      },
    ],
  };
}

function faqs({faq}) {
  return {
    description: truncate(policy?.body ?? ''),
    title: faq?.title,
    titleTemplate: '%s | Super Coffee',
    url,
    // uncomment and test this once we added FAQs page in shopify admin
    // jsonLd: {
    //   '@context': 'https://schema.org',
    //   '@type': 'FAQPage',
    //   mainEntity: parseFAQs(faq?.body).map((item) => {
    //     return {
    //       '@type': 'Question',
    //       name: item.question,
    //       acceptedAnswer: {
    //         '@type': 'Answer',
    //         text: item.answer,
    //       },
    //     };
    //   }),
    // },
  };
}

export const seoPayload = {
  article,
  blog,
  collection,
  home,
  listCollections,
  page,
  policies,
  policy,
  product,
  root,
  faqs,
};

/**
 * Truncate a string to a given length, adding an ellipsis if it was truncated
 * @returns The truncated string
 * @example
 * ```js
 * truncate('Hello world', 5) // 'Hello...'
 * ```
 * @param {string} str - The string to truncate
 */
function truncate(str, num = 155) {
  if (typeof str !== 'string') return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num - 3) + '...';
}

// extract question and answers from FAQs page body
function parseFAQs(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const questions = Array.from(doc.querySelectorAll('h2'));
  const answers = Array.from(doc.querySelectorAll('p'));

  if (questions.length !== answers.length) {
    throw new Error('Mismatch between number of questions and answers');
  }

  const faqs = questions.map((question, i) => {
    return {
      question: question.textContent.replace(`Question ${i + 1}:`, ''),
      answer: answers[i].textContent.replace(`Answer ${i + 1}:`, ''),
    };
  });

  return faqs;
}
