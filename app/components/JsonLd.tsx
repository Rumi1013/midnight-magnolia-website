"use client";

import { useId } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaData = Record<string, any> | Array<Record<string, any>>;

interface JsonLdProps {
  data: SchemaData;
}

/**
 * JsonLd Component
 *
 * A reusable component for injecting structured data (JSON-LD) into pages.
 * Supports single schema objects or arrays of multiple schemas.
 *
 * @example
 * // Single schema
 * <JsonLd data={generateOrganizationSchema()} />
 *
 * @example
 * // Multiple schemas
 * <JsonLd data={[generateOrganizationSchema(), generateWebSiteSchema()]} />
 */
export default function JsonLd({ data }: JsonLdProps) {
	const id = useId();

	// Ensure data is always an array for consistent handling
	const schemas = Array.isArray(data) ? data : [data];

	return (
		<>
			{schemas.map((schema, index) => (
				<script
					key={`${id}-${index}`}
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(schema, null, 0),
					}}
				/>
			))}
		</>
	);
}

/**
 * Server Component version of JsonLd
 * Use this in Server Components where useId is not available
 */
export function JsonLdServer({ data }: JsonLdProps) {
	const schemas = Array.isArray(data) ? data : [data];

	return (
		<>
			{schemas.map((schema, index) => (
				<script
					key={`jsonld-${index}`}
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(schema, null, 0),
					}}
				/>
			))}
		</>
	);
}
